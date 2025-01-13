import request from '@/utils/request';

// 分页查询音乐室
export const getListeningRoomListService = ({ roomId, page, pageSize, roomName, status }) =>
    request.get('/user/listen/list', { params: { roomId, page, pageSize, roomName, status } });

// 修改音乐室状态
export const updateListeningRoomStatusService = (roomId, status) =>
    request.put(`/user/listen/status/${roomId}?status=${status}`);

// 删除音乐室
export const deleteListeningRoomService = (roomId) =>
    request.delete(`/user/listen/delete/${roomId}`);
