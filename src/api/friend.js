// import request from '@/utils/request';

// // 添加好友
// export const addFriendService = (friendId) => request.post(`/user/friend/add/${friendId}`);

// // 获取好友申请状态
// export const getFriendStatusService = (userId) => {
//     Request.get(`/user/friend/status/${userId}`)
// };

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
                data: {
                    userId: 2,
                    status: 1,
                    friendId: 4,
                    createTime: '2023-06-06T08:00:00.000Z',
                },
            },
        });
    });
};
