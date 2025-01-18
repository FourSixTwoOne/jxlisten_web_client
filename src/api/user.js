import request from '@/utils/request';

// 注册
// export const registerUserService = (username, password, phone, repassword) =>
//     request.post('/user/user/login', { username, password, phone, repassword });
export const registerUserService = (username, password, phone, repassword) => {
    console.log('registerUserService called with:', { username, password, phone, repassword });
};

// 登录
// export const loginUserService = (username, password) => {
//     request.post('/user/user/login', { username, password });
//     console.log(username, password);
// };
export const loginUserService = (username, password) => {
    console.log('loginUserService called with:', { username, password });
};

// 获取用户信息
// export const getUserService = () => request.get('/user/user/info');
export const getUserService = () => {
    console.log('getUserService called');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                status: 200,
                data: {
                    code: 1,
                    message: 'success',
                    data: {
                        userId: 1,
                        username: '陆2壹',
                        phone: '12345678901',
                        image: '@/assets/logo2.png',
                        createTime: '2023-05-01 12:00:00',
                        updateTime: '2023-05-01 12:00:00',
                        type: '1',
                        gender: 1,
                        age: 18,
                        bio: '我是一个普通用户',
                    },
                },
            });
        });
    });
};

// 更新用户状态
// export const updateUserStatusService = (userId, status) =>
//     request.put(`/user/user/status/${userId}?status=${status}`);
export const updateUserStatusService = (userId, status) => {
    console.log('updateUserStatusService called with:', { userId, status });
};

// 更新用户
// export const updateUserService = (userId, username, bio) =>
//     request.put(`/user/user/update/${userId}`, { username, bio });
export const updateUserService = (userId, username, bio) => {
    console.log('updateUserService called with:', { userId, username, bio });
};

// 删除用户
// export const deleteUserService = (userId) => request.delete(`/user/user/delete/${userId}`);
export const deleteUserService = (userId) => {
    console.log('deleteUserService called with:', { userId });
};

// 上传文件
// export const uploadFileService = (file) => request.post('/user/user/upload', file);
export const uploadFileService = (file) => {
    console.log('uploadFileService called with:', file);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                status: 200,
                data: {
                    code: 1,
                    message: 'success',
                    data: {
                        url: 'https://example.com/uploaded-file.jpg',
                    },
                },
            });
        });
    });
};
