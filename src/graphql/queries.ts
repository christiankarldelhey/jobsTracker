export const getJobPosting = /* GraphQL */ `
  query GetJobPosting($id: ID!) {
    getJobPosting(id: $id) {
      id
      userId
      profileId
      text
      analyzedAt
      postingDate
      companyName
      url
      skills
      requiresDegree
      workMode
      location
      applied
      applicationDate
      notes
      createdAt
      updatedAt
      owner
    }
  }
`;

export const listJobPostings = /* GraphQL */ `
  query ListJobPostings(
    $filter: ModelJobPostingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJobPostings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        profileId
        text
        analyzedAt
        postingDate
        companyName
        url
        skills
        requiresDegree
        workMode
        location
        applied
        applicationDate
        notes
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;

export const listJobPostingsByProfile = /* GraphQL */ `
  query ListJobPostingsByProfile(
    $profileId: String!
    $analyzedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelJobPostingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJobPostingsByProfile(
      profileId: $profileId
      analyzedAt: $analyzedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        profileId
        text
        analyzedAt
        postingDate
        companyName
        url
        skills
        requiresDegree
        workMode
        location
        applied
        applicationDate
        notes
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
