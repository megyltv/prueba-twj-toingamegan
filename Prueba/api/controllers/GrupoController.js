/**
 * GrupoController
 *
 * @description :: Server-side logic for managing Grupoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	crearGrupo: function (req, res) {
		var parametros = req.allParams();

		if (req.method == 'POST') {
			if (parametros.nombreGrupo && parametros.numeroMaximoEstudiante && parametros.idMateria) {
				Grupo.create({
					nombreGrupo: parametros.nombreGrupo,
					numeroMaximoEstudiante: parametros.numeroMaximoEstudiante,
					idMateria: parametros.idMateria,
				}).exec(function (error, grupoCreado) {
					if (error) {
						return res.view('vistas/Error', {
							error: {
								desripcion: "Falla al crear nuevo grupo",
								rawError: error,
								url: "/CrearGrupo"
							}
						});
					}

					Grupo.find()
						.exec(function (error, gruposEncontrados) {

							if (error) {
								res.view('vistas/Error', {
									error: {
										desripcion: "Hubo un problema listando los grupos",
										rawError: error,
										url: "/ListarGrupos"
									}
								});
							}

							res.view('vistas/Grupo/listarGrupos', {
								grupos: gruposEncontrados
							});
						})

				});
			} else {
				// bad Request
				return res.view('error', {
					title: 'Error',
					error: {
						descripcion: 'No envia todos los parametros',
						url: '/CrearGrupo'
					}
				});
			}
		} else {
			return res.view('error', {
				title: 'Error',
				error: {
					descripcion: 'Falla en el metodo HTTP',
					url: '/CrearGrupo'
				}
			});
		}

	},
	
	BorrarGrupo: function (req, res) {

		var parametros = req.allParams();
		sails.log(parametros.id);

		if (parametros.id) {

			Grupo.destroy({
				id: parametros.id
			}).exec(function (error, GrupoRemovido) {
				if (error) {
					return res.view('vistas/Error', {
						error: {
							desripcion: "Tuvimos un Error Inesperado",
							rawError: error,
							url: "/ListarTodosGrupos"
						}
					});
				}
				Grupo.find()
					.exec(function (error, gruposEncontrados) {

						if (error) {
							res.view('vistas/Error', {
								error: {
									desripcion: "Hubo un problema listando los grupos",
									rawError: error,
									url: "/ListarTodosGrupos"
								}
							});
						}

						res.view('vistas/Grupo/ListarGrupos', {
							grupos: gruposEncontrados
						});
					})
			})

		} else {
			return res.view('vistas/Error', {
				error: {
					desripcion: "Necesitamos el ID para borrar el Grupo",
					rawError: "No envia ID",
					url: "/ListarTodosGrupos"
				}
			});
		}
	},
	
	editarGrupo: function (req, res) {

        var parametros = req.allParams();
		sails.log(parametros.idGrupo +parametros.nombreGrupo +parametros.numeroMaximoEstudiante +parametros.idMateria)

        if (parametros.idGrupo && (parametros.nombreGrupo || parametros.numeroMaximoEstudiante || parametros.idMateria)) {
            
            var grupoAEditar = {
                nombreGrupo: parametros.nombreGrupo,
                numeroMaximoEstudiante: parametros.numeroMaximoEstudiante,
                idMateria: parametros.idMateria
            }

            if (grupoAEditar.nombreGrupo == "") {
                delete grupoAEditar.nombreGrupo
            }
            if (grupoAEditar.numeroMaximoEstudiante == "") {
                delete grupoAEditar.numeroMaximoEstudiante
            }
            if (grupoAEditar.idMateria == "") {
                delete grupoAEditar.idMateria
            }
            

            Grupo.update({
                    id: parametros.idGrupo
                }, grupoAEditar)
                .exec(function (error, GrupoRemovido) {
                    if (error) {
                        return res.view('vistas/Error', {
                            error: {
                                desripcion: "Tuvimos un Error Inesperado",
                                rawError: error,
                                url: "/ListarGrupos"
                            }
                        });
                    }
                
                    Grupo.find()
                        .exec(function (error, gruposEncontrados) {

                            if (error) {
                                res.view('vistas/Error', {
                                    error: {
                                        desripcion: "Hubo un problema listando las Materias",
                                        rawError: error,
                                        url: "/ListarGrupos"
                                    }
                                });
                            }

                            res.view('vistas/Grupo/ListarGrupos', {
                                grupos: gruposEncontrados
                            });
                        })

                })
            
            
            
            
            

        } else {
            return res.view('vistas/Error', {
                error: {
                    desripcion: "Necesitamos que envies el ID y el nombre, topico o fecha de creacion de la materia",
                    rawError: "No envia Parametros",
                    url: "/ListarMaterias"
                }
            });
        }



    }
};