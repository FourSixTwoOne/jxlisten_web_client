// import request from '@/utils/request';

// // 分页查询歌曲
// export const getMusicListService = ({ title, author, page, pageSize, status }) =>
//     request.get('/user/music/list', { params: { title, author, page, pageSize, status } });

// // 修改歌曲状态
// export const updateMusicStatusService = (musicId, status) =>
//     request.put(`/user/music/status/${musicId}?status=${status}`);

// // 删除歌曲
// export const deleteMusicService = (musicId) => request.delete(`/user/music/delete/${musicId}`);

// // 上传歌曲
// export const uploadMusicService = ({ title, type, author, audioUrl, coverUrl }) =>
//     request.post('/user/music/upload', { title, type, author, audioUrl, coverUrl });

// // 获取歌曲信息
// export const getMusicService = (musicId) => request.get(`/user/music/find/${musicId}`);

// // 获取歌曲点赞收藏信息
// export const getMusicInteraction = (musicId, userId) =>
//     request.get(`/api/user/music/interact/${musicId}/${userId}`);

// // 修改歌曲点赞收藏信息
// export const updateMusicInteraction = ({ musicId, userId, isLike, isCollect }) =>
//     request.put(`/user/music/interact`, { musicId, userId, isLike, isCollect });

// // 查询收藏歌曲
// export const getCollectMusicListService = ({ userId }) =>
//     request.get(`/user/music/collect/${userId}`);

/******************************************************************************************/
// 模拟后端返回数据进行测试，后端返回result{code: , data:{}, message:''}

// 模拟 getMusicListService 方法
export const getMusicListService = async (params) => {
    console.log('getMusicListService called with:', params);
    return new Promise((resolve) => {
        resolve({
            status: 200,
            data: {
                code: 1,
                message: 'success',
                data: {
                    total: 10,
                    records: [
                       // { // musicId: 7,
// coverUrl: '',
// title: '曲名7',
// publisher: '发布者7',
// author: '作者7',
// uploadTime: '2023-10-07',
// audioUrl: // 'http://localhost:5173/src/assets/music/%E5%B0%8F%E5%9F%8E%E8%B0%A3%20-%20Vk.mp3',
// type: 1,
// 1: 原创 // likeCount: 0,
// collectCount: 0,
// isLike: false,
// isCollect: false,
// },
// { // musicId: 8,
// coverUrl: '',
// title: '曲名8',
// publisher: '发布者8',
// author: '作者8',
// uploadTime: '2023-10-08',
// audioUrl: // 'http://localhost:5173/src/assets/music/%E5%B0%8F%E5%9F%8E%E8%B0%A3%20-%20Vk.mp3',
// type: 2,
// 2: 翻唱 // likeCount: 0,
// collectCount: 0,
// isLike: false,
// isCollect: false,
// },
// { // musicId: 9,
// coverUrl: '',
// title: '曲名9',
// publisher: '发布者9',
// author: '作者9',
// uploadTime: '2023-10-09',
// audioUrl: // 'http://localhost:5173/src/assets/music/%E5%B0%8F%E5%9F%8E%E8%B0%A3%20-%20Vk.mp3',
// type: 3,
// 3: 转载 // likeCount: 0,
// collectCount: 0,
// isLike: false,
// isCollect: false,
// },
// { // musicId: 10,
// coverUrl: '',
// title: '曲名10',
// publisher: '发布者10',
// author: '作者10',
// uploadTime: '2023-10-10',
// audioUrl: // 'http://localhost:5173/src/assets/music/%E5%B0%8F%E5%9F%8E%E8%B0%A3%20-%20Vk.mp3',
// type: 1,
// 1: 原创 // likeCount: 0,
// collectCount: 0,
// isLike: false,
// isCollect: false,
// },
// { // musicId: 11,
// coverUrl: '',
// title: '曲名11',
// publisher: '发布者11',
// author: '作者11',
// uploadTime: '2023-10-11',
// audioUrl: // 'http://localhost:5173/src/assets/music/%E5%B0%8F%E5%9F%8E%E8%B0%A3%20-%20Vk.mp3',
// type: 2,
// 2: 翻唱 // likeCount: 0,
// collectCount: 0,
// isLike: false,
// isCollect: false,
// },
// { // musicId: 12,
// coverUrl: '',
// title: '曲名12',
// publisher: '发布者12',
// author: '作者12',
// uploadTime: '2023-10-12',
// audioUrl: // 'http://localhost:5173/src/assets/music/%E5%B0%8F%E5%9F%8E%E8%B0%A3%20-%20Vk.mp3',
// type: 3,
// 3: 转载 // likeCount: 0,
// collectCount: 0,
// isLike: false,
// isCollect: false,
// },
// { // musicId: 13,
// coverUrl: '',
// title: '曲名13',
// publisher: '发布者13',
// author: '作者13',
// uploadTime: '2023-10-13',
// audioUrl: // 'http://localhost:5173/src/assets/music/%E5%B0%8F%E5%9F%8E%E8%B0%A3%20-%20Vk.mp3',
// type: 1,
// 1: 原创 // likeCount: 0,
// collectCount: 0,
// isLike: false,
// isCollect: false,
// },
// { // musicId: 14,
// coverUrl: '',
// title: '曲名14',
// publisher: '发布者14',
// author: '作者14',
// uploadTime: '2023-10-14',
// audioUrl: // 'http://localhost:5173/src/assets/music/%E5%B0%8F%E5%9F%8E%E8%B0%A3%20-%20Vk.mp3',
// type: 2,
// 2: 翻唱 // likeCount: 0,
// collectCount: 0,
// isLike: false,
// isCollect: false,
// },
// { // musicId: 15,
// coverUrl: '',
// title: '曲名15',
// publisher: '发布者15',
// author: '作者15',
// uploadTime: '2023-10-15',
// audioUrl: // 'http://localhost:5173/src/assets/music/%E5%B0%8F%E5%9F%8E%E8%B0%A3%20-%20Vk.mp3',
// type: 3,
// 3: 转载 // likeCount: 0,
// collectCount: 0,
// isLike: false,
// isCollect: false,
// },
                        {
                            musicId: 16,
                            coverUrl: '',
                            title: '曲名16',
                            publisher: '发布者16',
                            author: '作者16',
                            uploadTime: '2023-10-16',
                            audioUrl:
                                'http://localhost:5173/src/assets/music/%E5%B0%8F%E5%9F%8E%E8%B0%A3%20-%20Vk.mp3',
                            type: 1, // 1: 原创
                            likeCount: 0,
                            collectCount: 0,
                            isLike: false,
                            isCollect: false,
                        },
                    ],
                },
            },
        });
    });
};

// 模拟 updateMusicStatusService 方法
export const updateMusicStatusService = (musicId, status) => {
    console.log('updateMusicStatusService called with:', { musicId, status });
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

// 模拟deleteMusicService
export const deleteMusicService = (musicId) => {
    console.log('deleteMusicService called with:', { musicId });
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

// 模拟 getMusicService 方法
export const getMusicService = (musicId) => {
    console.log('getMusicService called with:', { musicId });
    return new Promise((resolve) => {
        resolve({
            status: 200,
            data: {
                code: 1,
                message: 'success',
                data: {
                    musicId: 10,
                    coverUrl: '',
                    title: '曲名10',
                    publisher: '发布者10',
                },
            },
        });
    });
};

// 模拟 getMusicInteraction 方法
export const getMusicInteraction = (musicId, userId) => {
    console.log('getMusicInteraction called with:', { musicId, userId });
    return new Promise((resolve) => {
        resolve({
            status: 200,
            data: {
                code: 1,
                message: 'success',
                data: {
                    musicId: 10,
                    isLike: false,
                    isCollect: false,
                },
            },
        });
    });
};

// 模拟 updateMusicInteraction 方法
export const updateMusicInteraction = ({ musicId, userId, isLike, isCollect }) => {
    console.log('updateMusicInteraction called with:', { musicId, userId, isLike, isCollect });
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

// 查询收藏歌曲
export const getCollectMusicListService = ({ userId }) => {
    console.log('getCollectMusicListService called with:', { userId }) ||
        new Promise((resolve) => {
            resolve({
                status: 200,
                data: {
                    code: 1,
                    message: 'success',
                    data: [
                        {
                            musicId: 10,
                            coverUrl: '',
                            title: '曲名10',
                            publisher: '发布者10',
                            author: '作者10',
                        },
                    ],
                },
            });
        });
};

// 模拟 uploadMusicService 方法
export const uploadMusicService = ({ title, type, author, audioUrl, coverUrl }) => {
    console.log('Music uploaded:', title, type, author, audioUrl, coverUrl);
    return new Promise((resolve) => {
        resolve({
            status: 200,
            data: {
                code: 1,
                message: 'success',
                data: null,
            },
        });
    });
};
