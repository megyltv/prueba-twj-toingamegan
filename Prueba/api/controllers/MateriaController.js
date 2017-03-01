/**
 * MateriaController
 *
 * @description :: Server-side logic for managing Materias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	crearMateria: function (req, res) {
		if (req.method == "POST") {

			var parametros = req.allParams();

			if (parametros.nombreMateria && parametros.topicoMateria && parametros.fechaCreacion) {

				var materiaCrear = {
					nombreMateria: parametros.nombreMateria,
					topicoMateria: parametros.topicoMateria,
					fechaCreacion: parametros.fechaCreacion
				}

				Materia.create(materiaCrear).exec(function (error, materiaCreada) {

					if (error) {
						return res.view('vistas/Error', {
							error: {
								desripcion: "Falla al crear nueva materia",
								rawError: error,
								url: "/CrearMateria"
							}

						});
					}

					Materia.find()
						.exec(function (error, materiasEncontradas) {

							if (error) {
								res.view('vistas/Error', {
									error: {
										desripcion: "Hubo un problema listando las materias",
										rawError: error,
										url: "/ListarMaterias"
									}
								});
							}

							res.view('vistas/Materia/listarMaterias', {
								materias: materiasEncontradas
							});
						})

				})


			} else {

				return res.view('vistas/Error', {
					error: {
						desripcion: "Llena todos los parametros solicitados para la materia",
						rawError: "Fallo en envio de parametros",
						url: "/CrearMateria"
					}

				});

			}


		} else {

			return res.view('vistas/Error', {
				error: {
					desripcion: "Error en el uso del Metodo HTTP",
					rawError: "HTTP Invalido",
					url: "/CrearMateria"
				}
			});

		}
	},
	
	BorrarMateria: function (req, res) {

		var parametros = req.allParams();

		if (parametros.id) {

			Materia.destroy({
				id: parametros.id
			}).exec(function (error, MateriaRemovida) {
				if (error) {
					return res.view('vistas/Error', {
						error: {
							desripcion: "Tuvimos un Error Inesperado",
							rawError: error,
							url: "/ListarMaterias"
						}
					});
				}
				Materia.find()
					.exec(function (error, materiasEncontradas) {

						if (error) {
							res.view('vistas/Error', {
								error: {
									desripcion: "Hubo un problema listando las materias",
									rawError: error,
									url: "/ListarMaterias"
								}
							});
						}

						res.view('vistas/Materia/ListarMaterias', {
							materias: materiasEncontradas
						});
					})
			})

		} else {
			return res.view('vistas/Error', {
				error: {
					desripcion: "Necesitamos el ID para borrar la Materia",
					rawError: "No envia ID",
					url: "/ListarMaterias"
				}
			});
		}
	},
	
	editarMateria: function (req, res) {

        var parametros = req.allParams();

        if (parametros.idMateria && (parametros.nombreMateria || parametros.topicoMateria || parametros.fechaCreacion)) {
            
            var materiaAEditar = {
                nombreMateria: parametros.nombreMateria,
                topicoMateria: parametros.topicoMateria,
                fechaCreacion: parametros.fechaCreacion
            }

            if (materiaAEditar.nombreMateria == "") {
                delete materiaAEditar.nombreMateria
            }
            if (materiaAEditar.topicoMateria == "") {
                delete materiaAEditar.topicoMateria
            }
            if (materiaAEditar.fechaCreacion == "") {
                delete materiaAEditar.fechaCreacion
            }
            

            Materia.update({
                    id: parametros.idMateria
                }, materiaAEditar)
                .exec(function (error, MateriaRemovida) {
                    if (error) {
                        return res.view('vistas/Error', {
                            error: {
                                desripcion: "Tuvimos un Error Inesperado",
                                rawError: error,
                                url: "/ListarMaterias"
                            }
                        });
                    }
                
                    Materia.find()
                        .exec(function (error, materiasEncontradas) {

                            if (error) {
                                res.view('vistas/Error', {
                                    error: {
                                        desripcion: "Hubo un problema listando las Materias",
                                        rawError: error,
                                        url: "/ListarMaterias"
                                    }
                                });
                            }

                            res.view('vistas/Materia/ListarMaterias', {
                                materias: materiasEncontradas
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