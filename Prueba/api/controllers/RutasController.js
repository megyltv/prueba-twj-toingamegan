/**
 * RutasController
 *
 * @description :: Server-side logic for managing Rutas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	home: function (req, res) {
		// res.view(String: Nombre vista, Datos JSON)
		return res.view('vistas/home', {})

	},

	//	MATERIA 

	crearMateria: function (req, res) {

		return res.view('vistas/Materia/crearMateria')

	},

	listarMaterias: function (req, res) {
		Materia.find()
			.exec(function (error, materiasEncontradas) {

				if (error) {
					return res.view('vistas/Error', {
						error: {
							descripcion: "Hubo un problema listando las materias",
							rawError: error,
							url: "/ListarMaterias"
						}
					});
				}

				res.view('vistas/Materia/listarMaterias', {
					materias: materiasEncontradas
				})

			})
	},

	editarMateria: function (req, res) {

		var parametros = req.allParams();

		if (parametros.id) {

			Materia.findOne({
				id: parametros.id
			}).exec(function (error, MateriaEncontrada) {
				if (error) {
					return res.view('vistas/Error', {
						error: {
							desripcion: "Error Inesperado",
							rawError: error,
							url: "/ListarMaterias"
						}
					});
				}
				if (MateriaEncontrada) {
					return res.view("vistas/Materia/editarMateria", {
						materiaAEditar: MateriaEncontrada,

					});
				} else {
					return res.view('vistas/Error', {
						error: {
							desripcion: "La materia con id: " + parametros.id + " no existe.",
							rawError: "No existe la materia",
							url: "/ListarMaterias"
						}
					});
				}
			})
		} else {

			return res.view('vistas/Error', {
				error: {
					desripcion: "No ha enviado el parametro ID",
					rawError: "Faltan Parametros",
					url: "/ListarMaterias"
				}
			});

		}
	},

	//	GRUPO


	crearGrupo: function (req, res) {
		Materia.find().exec(function (error, materiasEncontradas) {
			if (error) return res.serverError();
			return res.view('vistas/Grupo/crearGrupo', {
				materias: materiasEncontradas
			});
		});

	},

	listarGrupos: function (req, res) {
		Grupo.find()
			.exec(function (error, gruposEncontrados) {

				if (error) {
					return res.view('vistas/Error', {
						error: {
							descripcion: "Hubo un problema listando las materias",
							rawError: error,
							url: "/ListarGrupos"
						}
					});
				}

				res.view('vistas/Grupo/listarGrupos', {
					grupos: gruposEncontrados
				})

			})
	},

	editarGrupo: function (req, res) {

		var parametros = req.allParams();

		if (parametros.id) {
			Grupo.findOne({
				id: parametros.id
			}).exec(function (error, grupoEncontrado) {
				if (error) {
					return res.view('vistas/Error', {
						error: {
							descripcion: 'Fallo al buscar el grupo',
							rawError: error,
							url: '/CrearGrupo'
						}
					});
				}


				Materia.find().exec(function (error, materiasEncontradas) {
					if (error) {
						return res.view('vistas/Error', {
							title: 'Error',
							error: {
								descripcion: 'Fallo al buscar la materia',
								rawError: error,
								url: '/CrearMateria'
							}
						});
					}

					return res.view('vistas/Grupo/editarGrupo', {
						grupoAEditar: grupoEncontrado,
						materias: materiasEncontradas
					})
				});

			});

		} else {
			return res.view('error', {
				error: {
					desripcion: "No ha enviado el parametro ID",
					rawError: "Faltan Parametros",
					url: "/ListarGrupos"
				}
			});
		}

	},

	error: function (req, res) {
		return res.view('vistas/Error', {
			error: {
				descripcion: "Usted esta por error en esta Ruta, dirijase a Inicio",
				rawError: "Ruta equivocada",
				url: "/Inicio"
			}
		})
	}

};