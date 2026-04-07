export const createJobPosting = /* GraphQL */ `
  mutation CreateJobPosting(
    $input: CreateJobPostingInput!
    $condition: ModelJobPostingConditionInput
  ) {
    createJobPosting(input: $input, condition: $condition) {
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

export const updateJobPosting = /* GraphQL */ `
  mutation UpdateJobPosting(
    $input: UpdateJobPostingInput!
    $condition: ModelJobPostingConditionInput
  ) {
    updateJobPosting(input: $input, condition: $condition) {
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

export const deleteJobPosting = /* GraphQL */ `
  mutation DeleteJobPosting(
    $input: DeleteJobPostingInput!
    $condition: ModelJobPostingConditionInput
  ) {
    deleteJobPosting(input: $input, condition: $condition) {
      id
    }
  }
`;
