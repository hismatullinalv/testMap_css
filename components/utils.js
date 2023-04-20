export const formateDate = async (timeStr) => {
    const timeArr = timeStr.split(":");
    const timeArr2 = timeArr[2].split(".")[0];
    const formattedTime = `${timeArr[0]}:${timeArr[1]}:${timeArr2}`;
    console.log(formattedTime);
    return formattedTime;
};
