import request from '@/utils/request';

// 分页查询歌曲
export const getMusicListService = ({ title, author, page, pageSize, status }) =>
    request.get('/user/music/list', { params: { title, author, page, pageSize, status } });

// 修改歌曲状态
export const updateMusicStatusService = (musicId, status) =>
    request.put(`/user/music/status/${musicId}?status=${status}`);

// 删除歌曲
export const deleteMusicService = (musicId) => request.delete(`/user/music/delete/${musicId}`);

// 上传歌曲
export const uploadMusicService = ({ title, type, author, audioUrl, coverUrl }) =>
    request.post('/user/music/upload', { title, type, author, audioUrl, coverUrl });
// export const uploadMusicService = (title, type, author, audioUrl, coverUrl) => {
//     console.log('uploadMusicService called with:', title, type, author, audioUrl, coverUrl);
// };

// 获取歌曲信息
// export const getMusicService = (musicId) => request.get(`/user/music/info/${musicId}`);
export const getMusicService = (musicId) => {
    console.log('getMusicService called with:', musicId);
};
