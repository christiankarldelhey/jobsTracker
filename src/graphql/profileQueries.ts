export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
      id
      userId
      name
      description
      color
      isDefault
      createdAt
      updatedAt
      owner
    }
  }
`;

export const listProfiles = /* GraphQL */ `
  query ListProfiles(
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        name
        description
        color
        isDefault
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
