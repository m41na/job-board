import { Job, Company } from "./db.js";

export const resolvers = {
    Query: {
        jobs: async () => Job.findAll(),
        job: (_root, { id }) => Job.findById(id),
        company: (_root, { id }) => Company.findById(id)
    },

    Job: {
        company: (job) => Company.findById(job.companyId)
    },

    Company: {
        jobs: (company) => Job.findAll((job) => job.companyId === company.id)
    },

    Mutation: {
        createJob: (_root, { input }) => {
            return Job.create(input)
        },

        updateJob: async (_root, { input }) => {
            const job = await Job.findById(input.id);
            console.log(`updating fields ${JSON.stringify(input)} in the job ${JSON.stringify(job)}`);
            return Job.update({...job, ...input});
        },

        deleteJob: (_root, { jobId }) => {
            return Job.delete(jobId);
        }
    }
}