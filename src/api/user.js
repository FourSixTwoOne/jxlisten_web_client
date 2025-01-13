import request from '@/utils/request';

// 注册
export const registerUserService = (username, password, phone, repassword) =>
    request.post('/user/user/login', { username, password, phone, repassword });

// 登录
export const loginUserService = (username, password) => {
    request.post('/user/user/login', { username, password });
    console.log(username, password);
};

// 获取用户信息
export const getUserService = () => request.get('/user/user/info');

// 更新用户状态
export const updateUserStatusService = (userId, status) =>
    request.put(`/user/user/status/${userId}?status=${status}`);

// 删除用户
export const deleteUserService = (userId) => request.delete(`/user/user/delete/${userId}`);
