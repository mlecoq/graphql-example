const { makeExecutableSchema } = require('graphql-tools');
const server = require('apollo-server-micro');

const typeDefs = `
    type Person {
        id: ID!
        nom: String!
        prenom: String!
        job: String
        vehicule: Vehicule
    }

    type Vehicule {
        who: ID!
        type: String
    }

    type Query{
        person(id: ID!): Person
        people: [Person]!
    }

    input PersonInput{
        id: ID!
        nom: String!
        prenom: String!
        job: String
    }

    type Mutation{
        addPerson(person: PersonInput): Boolean!
    }
`;

const resolvers = {
  Query: {
    people: () => people,
    person: (_, { id }) => {
      return people.find(p => p.id === id);
    },
  },
  Person: {
    vehicule: person => vehicules.find(v => v.who === person.id),
  },
  Mutation: {
    addPerson: (_, { person }) => {
      console.log(person);
      people.push(person);
      return true;
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const people = [
  { id: '1', nom: 'Le Bris', prenom: 'Frederic', job: 'CTO' },
  { id: '2', nom: 'Millet', prenom: 'Frederic', job: 'Devops' },
  { id: '3', nom: 'Lecoq', prenom: 'Mickael', job: 'Developer Freelance' },
  { id: '4', nom: 'Deshayes', prenom: 'Lucie', job: 'Designer' },
  { id: '5', nom: 'Frin', prenom: 'Benjamin' },
  { id: '6', nom: 'Guillemot', prenom: 'Laura' },
];

const vehicules = [
  { who: '1', type: 'Voiture' },
  { who: '2', type: 'Voiture' },
  { who: '3', type: 'Velo' },
  { who: '4', type: 'Bus' },
  { who: '5', type: 'Il faut que je lui demande' },
  { who: '6', type: 'Bus' },
];

module.exports = server.microGraphql({ schema });
