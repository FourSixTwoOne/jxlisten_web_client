// import request from '@/utils/request';

// // 分页查询音乐室
// export const getListeningRoomListService = ({ roomId, page, pageSize, roomName, status }) =>
//     request.get('/user/listen/list', { params: { roomId, page, pageSize, roomName, status } });

// //查询音乐室信息
// export const getRoomService = (roomId) => request.get(`/user/listen/info/${roomId}`);

// // 修改音乐室状态
// export const updateListeningRoomStatusService = (roomId, status) =>
//     request.put(`/user/listen/status/${roomId}?status=${status}`);

// // 删除音乐室
// export const deleteListeningRoomService = (roomId) =>
//     request.delete(`/user/listen/delete/${roomId}`);

// // 创建音乐室
// export const createListeningRoomService = ({ roomName, description, coverUrl }) =>
//     request.post('/user/listen/create', { roomName, description, coverUrl });

/******************************************************************************************/
// 模拟后端返回数据进行测试，后端返回result{code: , data:{}, message:''}

// 模拟getListeningRoomListService
export const getListeningRoomListService = ({ roomId, page, pageSize, roomName, status }) => {
    console.log('getListeningRoomListService called with:', {
        roomId,
        page,
        pageSize,
        roomName,
        status,
    });
    return new Promise((resolve) => {
        resolve({
            status: 200,
            data: {
                code: 1,
                message: 'success',
                data: {
                    total: 10,
                    records: [
                        {
                            roomId: 1,
                            roomName: '房间A',
                            createdName: '用户A',
                            createTime: '2023-10-01',
                            coverUrl: '@/assets/cover.jpg',
                            description:
                                '这是一个专注于古典音乐交流的房间，欢迎喜欢交响乐、协奏曲的朋友加入讨论',
                        },
                        {
                            roomId: 2,
                            roomName: '房间B',
                            createdName: '用户B',
                            createTime: '2023-10-02',
                            coverUrl: '@/assets/cover.jpg',
                            description:
                                '摇滚乐迷聚集地，分享经典摇滚和最新摇滚单曲，定期组织线上听歌会',
                        },
                        {
                            roomId: 2,
                            roomName: '房间B',
                            createdName: '用户B',
                            createTime: '2023-10-02',
                            coverUrl: '@/assets/cover.jpg',
                            description:
                                '摇滚乐迷聚集地，分享经典摇滚和最新摇滚单曲，定期组织线上听歌会',
                        },
                        {
                            roomId: 2,
                            roomName: '房间B',
                            createdName: '用户B',
                            createTime: '2023-10-02',
                            coverUrl: '@/assets/cover.jpg',
                            description:
                                '摇滚乐迷聚集地，分享经典摇滚和最新摇滚单曲，定期组织线上听歌会',
                        },
                        {
                            roomId: 2,
                            roomName: '房间B',
                            createdName: '用户B',
                            createTime: '2023-10-02',
                            coverUrl: '@/assets/cover.jpg',
                            description:
                                '摇滚乐迷聚集地，分享经典摇滚和最新摇滚单曲，定期组织线上听歌会',
                        },
                        {
                            roomId: 2,
                            roomName: '房间B',
                            createdName: '用户B',
                            createTime: '2023-10-02',
                            coverUrl: '@/assets/cover.jpg',
                            description:
                                '摇滚乐迷聚集地，分享经典摇滚和最新摇滚单曲，定期组织线上听歌会',
                        },
                        {
                            roomId: 2,
                            roomName: '房间B',
                            createdName: '用户B',
                            createTime: '2023-10-02',
                            coverUrl: '@/assets/cover.jpg',
                            description:
                                '摇滚乐迷聚集地，分享经典摇滚和最新摇滚单曲，定期组织线上听歌会',
                        },
                        {
                            roomId: 2,
                            roomName: '房间B',
                            createdName: '用户B',
                            createTime: '2023-10-02',
                            coverUrl: '@/assets/cover.jpg',
                            description:
                                '摇滚乐迷聚集地，分享经典摇滚和最新摇滚单曲，定期组织线上听歌会',
                        },
                    ],
                },
            },
        });
    });
};

// 模拟createListeningRoomService
export const createListeningRoomService = ({ roomName, createdId, coverUrl, description }) => {
    console.log('createListeningRoomService called with:', {
        roomName,
        createdId,
        coverUrl,
        description,
    });
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

// 模拟getRoomService
export const getRoomService = (roomId) => {
    console.log('getRoomService called with:', { roomId });
    return new Promise((resolve) => {
        resolve({
            status: 200,
            data: {
                code: 1,
                message: 'success',
                data: {
                    roomId: 1,
                    roomName: '房间A',
                    createdName: '用户A',
                    createTime: '2023-10-01',
                    coverUrl: '@/assets/cover.jpg',
                    description:
                        '这是一个专注于古典音乐交流的房间，欢迎喜欢交响乐、协奏曲的朋友加入讨论',
                },
            },
        });
    });
};

// 模拟updateListeningRoomStatusService
export const updateListeningRoomStatusService = (roomId, status) => {
    console.log('updateListeningRoomStatusService called with:', { roomId, status });
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

// 模拟deleteListeningRoomService
export const deleteListeningRoomService = (roomId) => {
    console.log('deleteListeningRoomService called with:', { roomId });
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
