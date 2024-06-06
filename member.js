function skillsMember(): any
{
    return {
        member: {
            skills: {
                async create(data: any, context: any)
                {
                    return await context.prisma.skill.create({
                        data: {
                            ...data,
                            member: {
                                connect: { id: context.member.id },
                            },
                        },
                    });
                },
                async update(id: any, data: any, context: any)
                {
                    return await context.prisma.skill.update({
                        where: { id },
                        data,
                    });
                },
                async delete(id: any, context: any)
                {
                    return await context.prisma.skill.delete({
                        where: { id },
                    });
                },
            },
        },
    };
}