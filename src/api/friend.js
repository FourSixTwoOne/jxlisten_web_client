// import request from '@/utils/request';

// // 添加好友
// export const addFriendService = (friendId) => request.post(`/user/friend/add/${friendId}`);

// // 获取好友申请状态
// export const getFriendStatusService = (userId) => {
//     Request.get(`/user/friend/status/${userId}`)
// };

// // 获取好友列表
// export const getFriendsService = (ids) => Request.get(`/user/friend/list`, { params: { ids } });

/******************************************************************************************/
// 模拟后端返回数据进行测试，后端返回result{code: , data:{}, message:''}

// 模拟addFriendService
export const addFriendService = (friendId) => {
    console.log('addFriendService called with:', { friendId });
    return new Promise((resolve) => {
        resolve({
            status: 200,
            data: {
                code: 1,
                message: 'success',
                data: {},
            },
        });
    });
};

// 模拟getFriendStatusService
export const getFriendStatusService = (userId) => {
    console.log('getFriendStatusService called with:', { userId });
    return new Promise((resolve) => {
        resolve({
            status: 200,
            data: {
                code: 1,
                message: 'success',
                data: [
                    {
                        userId: 1,
                        status: 0,
                        friendId: 2,
                        createTime: '2023-06-06T08:00:00.000Z',
                    },
                    {
                        userId: 1,
                        status: 1,
                        friendId: 3,
                        createTime: '2023-06-06T08:00:00.000Z',
                    },
                    {
                        userId: 1,
                        status: 1,
                        friendId: 3,
                        createTime: '2023-06-06T08:00:00.000Z',
                    },
                    {
                        userId: 1,
                        status: 1,
                        friendId: 4,
                        createTime: '2023-06-06T08:00:00.000Z',
                    },
                    {
                        userId: 1,
                        status: 1,
                        friendId: 5,
                        createTime: '2023-06-06T08:00:00.000Z',
                    },
                    {
                        userId: 1,
                        status: 1,
                        friendId: 6,
                        createTime: '2023-06-06T08:00:00.000Z',
                    },
                    {
                        userId: 1,
                        status: 3,
                        friendId: 7,
                        createTime: '2023-06-06T08:00:00.000Z',
                    },
                    {
                        userId: 1,
                        status: 2,
                        friendId: 8,
                        createTime: '2023-06-06T08:00:00.000Z',
                    },
                    {
                        userId: 1,
                        status: 1,
                        friendId: 9,
                        createTime: '2023-06-06T08:00:00.000Z',
                    },
                    {
                        userId: 1,
                        status: 1,
                        friendId: 10,
                        createTime: '2023-06-06T08:00:00.000Z',
                    },
                    {
                        userId: 1,
                        status: 1,
                        friendId: 11,
                        createTime: '2023-06-06T08:00:00.000Z',
                    },
                    {
                        userId: 1,
                        status: 0,
                        friendId: 13,
                        createTime: '2023-06-06T08:00:00.000Z',
                    },
                    {
                        userId: 1,
                        status: 0,
                        friendId: 14,
                        createTime: '2023-06-06T08:00:00.000Z',
                    },
                ],
            },
        });
    });
};

// 模拟getFriendsService
export const getFriendsService = (ids) => {
    console.log('getFriendsService called with:', { ids });
    return new Promise((resolve) => {
        resolve({
            status: 200,
            data: {
                code: 1,
                message: 'success',
                data: [
                    {
                        friendId: 2,
                        username: 'Alice',
                        image: 'https://example.com/images/alice.png',
                    },
                    {
                        friendId: 3,
                        username: 'Bob',
                        image: 'https://example.com/images/bob.png',
                    },
                    {
                        friendId: 4,
                        username: 'Charlie',
                        image: 'https://example.com/images/charlie.png',
                    },
                    {
                        friendId: 5,
                        username: 'David',
                        image: 'https://example.com/images/david.png',
                    },
                    {
                        friendId: 6,
                        username: 'Eva',
                        image: 'https://example.com/images/eva.png',
                    },
                    {
                        friendId: 7,
                        username: 'Frank',
                        image: 'https://example.com/images/frank.png',
                    },
                    {
                        friendId: 8,
                        username: 'Grace',
                        image: 'https://example.com/images/grace.png',
                    },
                    {
                        friendId: 9,
                        username: 'Hannah',
                        image: 'https://example.com/images/hannah.png',
                    },
                    {
                        friendId: 10,
                        username: 'Ian',
                        image: 'https://example.com/images/ian.png',
                    },
                    {
                        friendId: 11,
                        username: 'Judy',
                        image: 'https://example.com/images/judy.png',
                    },
                    {
                        friendId: 13,
                        username: 'Kevin',
                        image: 'https://example.com/images/kevin.png',
                    },
                    {
                        friendId: 14,
                        username: 'Laura',
                        image: 'https://example.com/images/laura.png',
                    },
                ],
            },
        });
    });
};
