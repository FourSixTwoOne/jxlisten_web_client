// import request from '@/utils/request';

// // 注册
// export const registerUserService = ({ username, password, phone, rePassword }) =>
//     request.post('/user/user/register', { username, password, phone, rePassword });

// // 登录
// export const loginUserService = ({ username, password }) =>
//     request.post('/user/user/login', { username, password });

// // 获取当前用户信息
// export const getUserService = () => request.get('/user/user/info');

// // 更新用户状态
//  export const updateUserStatusService = (userId, status) =>
//      request.put(`/user/user/status/${userId}?status=${status}`);

// // 更新用户
// export const updateUserService = ({ userId, username, image, bio, gender, age }) =>
//     request.put(`/user/user/update`, { userId, username, image, bio, gender, age });

// // 删除用户
//  export const deleteUserService = (userId) => request.delete(`/user/user/delete/${userId}`);

// // 上传文件
// export const uploadFileService = (file) => request.post('/common/upload', file);

// // 通过name查询用户列表
// export const getUserListByNameService = (username) => request.get(`/user/user/list/${username}`);

// // 通过id查询用户列表
// export const getUserListByIdService = (userId) => request.get(`/user/user/list/${userId}`);

/******************************************************************************************/
// 模拟后端返回数据进行测试，后端返回result{code: , data:{}, message:''}

// 模拟registerUserService
export const registerUserService = (username, password, phone, repassword) => {
    console.log('registerUserService called with:', { username, password, phone, repassword });
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

// 模拟loginUserService
export const loginUserService = (username, password) => {
    console.log('loginUserService called with:', { username, password });
    return new Promise((resolve) => {
        resolve({
            status: 200,
            data: {
                code: 1,
                message: 'success',
                data: {
                    userId: 1,
                    username: '陆2壹',
                    token: 'qwer12345678901',
                },
            },
        });
    });
};

// 模拟getUserListService
export const getUserListByNameService = (username) => {
    console.log('getUserListByNameService called with:', { username });
    return new Promise((resolve) => {
        resolve({
            status: 200,
            data: {
                code: 1,
                message: 'success',
                data: [
                    {
                        userId: 1,
                        username: '陆2壹',
                        phone: '12345678901',
                        image: '@/assets/logo2.png',
                        createTime: '2023-05-01 12:00:00',
                    },
                ],
            },
        });
    });
};

// 模拟getUserListByIdService
export const getUserListByIdService = (userId) => {
    console.log('getUserListByIdService called with:', { userId });
    return new Promise((resolve) => {
        resolve({
            status: 200,
            data: {
                code: 1,
                message: 'success',
                data: [
                    {
                        userId: 2,
                        username: '二狗',
                        phone: '12345678901',
                        image: '@/assets/logo2.png',
                        createTime: '2023-05-01 12:00:00',
                    },
                    {
                        userId: 3,
                        username: '坨坨',
                        phone: '12345678901',
                        image: '@/assets/logo2.png',
                        createTime: '2023-05-01 12:00:00',
                    },
                ],
            },
        });
    });
};

// 模拟getUserService
export const getUserService = () => {
    console.log('getUserService called');
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                status: 200,
                data: {
                    code: 1,
                    message: 'success',
                    data: {
                        userId: 1,
                        username: '陆2壹',
                        image: '@/assets/logo2.png',
                        createTime: '2023-05-01 12:00:00',
                        updateTime: '2023-05-01 12:00:00',
                        type: '1',
                        gender: 0,
                        age: 18,
                        bio: '平台作者',
                    },
                },
            });
        });
    });
};

// 模拟updateUserStatusService
export const updateUserStatusService = (userId, status) => {
    console.log('updateUserStatusService called with:', { userId, status });
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

// 模拟updateUserService
export const updateUserService = ({ userId, username, bio }) => {
    console.log('updateUserService called with:', { userId, username, bio });
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

// 模拟deleteUserService
export const deleteUserService = (userId) => {
    console.log('deleteUserService called with:', { userId });
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

// 模拟uploadFileService
export const uploadFileService = (file) => {
    console.log('uploadFileService called with:', file);
    return new Promise((resolve) => {
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
};
