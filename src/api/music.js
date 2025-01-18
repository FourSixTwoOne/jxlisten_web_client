import request from '@/utils/request';

// 分页查询歌曲
export const getMusicListService = ({ title, author, page, pageSize, status }) =>
    request.get('/user/music/list', { params: { title, author, page, pageSize, status } });

// 修改歌曲状态
export const updateMusicStatusService = (musicId, status) =>
    request.put(`/user/music/status/${musicId}?status=${status}`);

// 删除歌曲
export const deleteMusicService = (musicId) => request.delete(`/user/music/delete/${musicId}`);

// export const uploadMusicService = (title,type,author,audioUrl,coverUrl) => request.post('/user/music/upload', file);
export const uploadMusicService = (title,type,author,audioUrl,coverUrl) => {
    console.log('uploadMusicService called with:', title,type,author,audioUrl,coverUrl);
};
