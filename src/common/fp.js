export const dateTransform = (timeStamp = Date.now()) => {
    const target = new Date(timeStamp);
    target.setHours(0); // 设置 小时 为 0
    target.setMinutes(0); // 设置 分钟 为 0
    target.setSeconds(0); // 设置 秒 为 0
    target.setMilliseconds(0); // 设置 毫秒 为 0

    // console.log('target:', target);
    return target.getTime();
};
