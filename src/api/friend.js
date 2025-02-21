import request from '@/utils/request';

// 添加好友
export const addFriendService = (friendId) => request.post(`/user/friend/add/${friendId}`);

// 获取好友申请状态
export const getFriendStatusService = (userId) => {
    request.get(`/user/friend/status/${userId}`)
};

// 获取好友发送的申请记录
export const getReceivedService = () =>
   request.get(`/user/friend/received`);

// 获取给好友发送的申请记录
export const getSendService = () =>
    request.get('/user/friend/send');

// 获取好友列表
export const getFriendsService = () => request.get(`/user/friend/list`);

// 设置type
export const setTypeService = (friendId, type) =>
    request.put(`/user/friend/type/${friendId}/${type}`);

// 处理好友申请（同意1，拒绝2）
export const handleFriendService = ({friendId, status}) =>
    request.put(`/user/friend/handle/${friendId}?status=${status}`);

/******************************************************************************************/
// 模拟后端返回数据进行测试，后端返回result{code: , data:{}, msg:''}

// // 模拟addFriendService
// export const addFriendService = (friendId) => {
//     console.log('addFriendService called with:', { friendId });
//     return new Promise((resolve) => {
//         resolve({
//             status: 200,
//             data: {
//                 code: 1,
//                 msg: 'success',
//                 data: {},
//             },
//         });
//     });
// };

// // 模拟getFriendStatusService
// export const getFriendStatusService = (userId) => {
//     console.log('getFriendStatusService called with:', { userId });
//     return new Promise((resolve) => {
//         resolve({
//             status: 200,
//             data: {
//                 code: 1,
//                 msg: 'success',
//                 data: [
//                     {
//                         userId: 1,
//                         status: 0,
//                         friendId: 2,
//                         createTime: '2023-06-06T08:00:00.000Z',
//                     },
//                     {
//                         userId: 1,
//                         status: 1,
//                         friendId: 3,
//                         createTime: '2023-06-06T08:00:00.000Z',
//                     },
//                     {
//                         userId: 1,
//                         status: 1,
//                         friendId: 3,
//                         createTime: '2023-06-06T08:00:00.000Z',
//                     },
//                     {
//                         userId: 1,
//                         status: 1,
//                         friendId: 4,
//                         createTime: '2023-06-06T08:00:00.000Z',
//                     },
//                     {
//                         userId: 1,
//                         status: 1,
//                         friendId: 5,
//                         createTime: '2023-06-06T08:00:00.000Z',
//                     },
//                     {
//                         userId: 1,
//                         status: 1,
//                         friendId: 6,
//                         createTime: '2023-06-06T08:00:00.000Z',
//                     },
//                     {
//                         userId: 1,
//                         status: 3,
//                         friendId: 7,
//                         createTime: '2023-06-06T08:00:00.000Z',
//                     },
//                     {
//                         userId: 1,
//                         status: 2,
//                         friendId: 8,
//                         createTime: '2023-06-06T08:00:00.000Z',
//                     },
//                     {
//                         userId: 1,
//                         status: 1,
//                         friendId: 9,
//                         createTime: '2023-06-06T08:00:00.000Z',
//                     },
//                     {
//                         userId: 1,
//                         status: 1,
//                         friendId: 10,
//                         createTime: '2023-06-06T08:00:00.000Z',
//                     },
//                     {
//                         userId: 1,
//                         status: 1,
//                         friendId: 11,
//                         createTime: '2023-06-06T08:00:00.000Z',
//                     },
//                     {
//                         userId: 1,
//                         status: 0,
//                         friendId: 13,
//                         createTime: '2023-06-06T08:00:00.000Z',
//                     },
//                     {
//                         userId: 1,
//                         status: 0,
//                         friendId: 14,
//                         createTime: '2023-06-06T08:00:00.000Z',
//                     },
//                 ],
//             },
//         });
//     });
// };

// // 模拟getReceivedService
// export const getReceivedService = () => {
//     console.log('getReceivedService called');
//     return new Promise((resolve) => {
//         resolve({
//             status: 200,
//             data: {
//                 code: 1,
//                 msg: 'success',
//                 data: [
//                     {
//                         status: 0,
//                         friendId: 2,
//                         image: 'https://example.com/images/alice.png',
//                         username: 'Alice',
//                         createTime: '2021.01.01.00:00:00',
//                         type: 0,
//                     },
//                     {
//                         status: 1,
//                         friendId: 4,
//                         image: 'https://example.com/images/alice.png',
//                         username: 'Tom',
//                         createTime: '',
//                         type: 1,
//                     },
//                     {
//                         status: 2,
//                         friendId: 6,
//                         image: 'https://example.com/images/alice.png',
//                         username: 'Bob',
//                         createTime: '2021.01.01.00:00:00',
//                         type: 0,
//                     },
//                     {
//                         status: 3,
//                         friendId: 8,
//                         image: 'https://example.com/images/alice.png',
//                         username: 'John',
//                         createTime: '2021.01.01.00:00:00',
//                         type: 1,
//                     },
//                 ],
//             },
//         });
//     });
// };

// // getSendService
// export const getSendService = () => {
//     console.log('getSendService called');
//     return new Promise((resolve) => {
//         resolve({
//             status: 200,
//             data: {
//                 code: 1,
//                 msg: 'success',
//                 data: [
//                     {
//                         status: 0,
//                         friendId: 3,
//                         image: 'https://example.com/images/alice.png',
//                         username: 'Alia',
//                         createTime: '2021.01.01.00:00:01',
//                         type: 1,
//                     },
//                     {
//                         status: 1,
//                         friendId: 5,
//                         image: 'https://example.com/images/alice.png',
//                         username: 'Joe',
//                         createTime: '',
//                         type: 0,
//                     },
//                     {
//                         status: 2,
//                         friendId: 7,
//                         image: 'https://example.com/images/alice.png',
//                         username: 'Macile',
//                         createTime: '',
//                         type: 0,
//                     },
//                     {
//                         status: 3,
//                         friendId: 9,
//                         image: 'https://example.com/images/alice.png',
//                         username: 'Machine',
//                         createTime: '2021.01.01.00:00:00',
//                         type: 0,
//                     },
//                 ],
//             },
//         });
//     });
// };

// // 模拟getFriendsService
// export const getFriendsService = () => {
//     console.log('getFriendsService called with:');
//     return new Promise((resolve) => {
//         resolve({
//             status: 200,
//             data: {
//                 code: 1,
//                 msg: 'success',
//                 data: [
//                     {
//                         status: 1,
//                         friendId: 4,
//                         image: 'https://example.com/images/alice.png',
//                         username: 'Tom',
//                         createTime: '',
//                         type: 1,
//                     },
//                     {
//                         status: 1,
//                         friendId: 5,
//                         image: 'https://example.com/images/alice.png',
//                         username: 'Joe',
//                         createTime: '2021.01.01.00:00:00',
//                         type: 1,
//                     },
//                 ],
//             },
//         });
//     });
// };

// // 模拟handleFriendService
// export const handleFriendService = (friendId, type) => {
//     console.log('handleFriendService called with:', friendId, type);
//     return new Promise((resolve) => {
//         resolve({
//             status: 200,
//             data: {
//                 code: 1,
//                 msg: 'success',
//                 data: {},
//             },
//         });
//     });
// };
