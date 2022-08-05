import { request, gql } from 'graphql-request';

const GRAPHQL_URL = 'http://localhost:9000/graphql';

export async function getCompany(id) {
    const query = gql`
        query companyById($companyId: ID!){
            company (id: $companyId){
                id
                name
                description
                jobs {
                    id
                    title
                }
            }
        }
    `;

    const variables = { companyId: id };

    const { company } = await request(GRAPHQL_URL, query, variables);
    return company;
}

export async function getJob(id) {
    const query = gql`
        query jobById($jobId: ID!) {
            job(id: $jobId) {
                company {
                    id
                    name
                }
                title
                description
            }
        }
    `;

    const variables = { jobId: id };

    const { job } = await request(GRAPHQL_URL, query, variables);
    return job;
}

export async function getJobs() {
    const query = gql`
        query {
            jobs {
                id
                title
                description
                company {
                name
                }
            }
        }
    `;

    const { jobs } = await request(GRAPHQL_URL, query);
    return jobs;
}

export async function createJob(input) {
    const query = gql`
        mutation createNewJob($input: CreateJobInput!){
            job: createJob(input: $input) {
                id
            }
        }
    `;

    const variables = { input };

    const { job } = await request(GRAPHQL_URL, query, variables);
    return job;
}

export async function updateJob(input) {
    const query = gql`
        mutation updateNewJob($input: UpdateJobInput!){
            job: updateJob(input: $input) {
                id
            }
        }
    `;

    const variables = { input };

    const { job } = await request(GRAPHQL_URL, query, variables);
    return job;
}

export async function deleteJob(jobId) {
    const query = gql`
        mutation deleteJobById($jobId: ID!){
            deleteJob(jobId: $jobId){
                id
            }
        }
    `;

    const variables = { jobId };

    const { job } = await request(GRAPHQL_URL, query, variables);
    return job;
}