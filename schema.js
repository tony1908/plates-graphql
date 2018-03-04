const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools')
const casual = require('casual')

const typeDefs = `
	#Esto es un curso
	type Curso {
		id: ID!
		titulo: String!
		descripcion: String!
		profesor: Profesor
		raiting: Float
		comentarios: [Comentario]
	}

	type Profesor {
		id: ID!
		nombre: String!
		nacionalidad: String!
		genero: Genero
		cursos: [Curso]
	}

	enum Genero {
		MASCULINO 
		FEMENINO
	}

	type Comentario {
		id: ID!
		nombre: String!
		cuerpo: String!
	}

	type Query {
		cursos: [Curso]
		profesores: [Profesor]
		curso(id: Int): Curso
		profesor(id: Int): Profesor
	}
`

const resolvers = {
	Query: {
		cursos: () => {
			return [{
				id: 1,
				titulo: "Curso de graphql",
				descripcion: "Buen curso"
			},
			{
				id: 2,
				titulo: "Curso de php ",
				descripcion: "Buen curso de php"
			}]
		},

		profesores: () => {
			return [{
				id: 1,
				nombre: "Juan",
				nacionalidad: "Mexa"
			}]
		}
	},
	Curso: {
		profesor: () => {
			return {
				nombre: "Pablo",
				nacionalidad: "Mexa"
			}
		}, 
		comentarios: () => {
			return [{
				nombre: "Chuchito",
				cuerpo: "Fue muy padre"
			}]
		}
	}
}


const schema = makeExecutableSchema({
	typeDefs,
	resolvers
})

addMockFunctionsToSchema({
	schema,
	mocks: {
		Curso: () => {
			return {
				id: casual.uuid,
				titulo: casual.sentence,
				descripcion: casual.sentences(2)
			}
		},
		Profesor: () => {
			return {
				nombre: casual.name,
				cuerpo: casual.country
			}
		}
	}, preserveResolvers: true
})

module.exports = schema