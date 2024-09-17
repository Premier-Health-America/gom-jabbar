export const login = async (username: string, password: string) => {
    // return '/nurse/login';
    return {
        message: 'Login successful',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJudXJzZUlkIjoyLCJpYXQiOjE3MjY1NzIzMjcsImV4cCI6MTcyNjU3NTkyN30.HzXbdVw6f2sQO5kbVlznEfBg26q6a7jmFodz7BBHmRk',
        nurse: {
            username: 'juju',
        },
    };
};

export const getNurse = async (token: string) => {
    // return '/nurse';
    return {
        message: 'Login successful',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJudXJzZUlkIjoyLCJpYXQiOjE3MjY1NzIzMjcsImV4cCI6MTcyNjU3NTkyN30.HzXbdVw6f2sQO5kbVlznEfBg26q6a7jmFodz7BBHmRk',
        nurse: {
            username: 'juju',
        },
    };
};

export const register = async (username: string, password: string) => {
    // return '/nurse/register';
    return {
        message: 'Nurse registered successfully',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJudXJzZUlkIjoyLCJpYXQiOjE3MjY1NzIzMjcsImV4cCI6MTcyNjU3NTkyN30.HzXbdVw6f2sQO5kbVlznEfBg26q6a7jmFodz7BBHmRk',
        nurse: {
            username: 'juju',
        },
    };
};
