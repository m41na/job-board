import { Job, Company } from "./db.js";

export function rejectIf(condition){
    if (condition) {
        throw new Error("Unauthorized");
    }
}

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
        createJob: (_root, { input }, { user }) => {
            rejectIf(!user);
            console.log("[User creating job]", user);
            return Job.create({ ...input, companyId: user.companyId });
        },

        updateJob: async (_root, { input }, { user }) => {
            rejectIf(!user);
            const job = await Job.findById(input.id);
            rejectIf(job.companyId !== user.companyId);
            return Job.update({ ...job, ...input });
        },

        deleteJob: async (_root, { jobId }, { user }) => {
            rejectIf(!user);
            const job = await Job.findById(jobId);
            rejectIf(job.companyId !== user.companyId);
            return Job.delete(jobId);
        }
    }
}