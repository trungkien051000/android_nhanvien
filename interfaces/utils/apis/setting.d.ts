interface ISettingDataAPI {
    name: string;
    birthday: string;
    gender: string;
    email: string;
    phone: string;
    address: string;
    username: string;
    password: string;
    language: string;
}

interface IGetSettingDetailAPIRes extends IBaseAPIRes {
    results: ISettingDataAPI;
}

interface ISendSettingAPIRes extends IBaseAPIRes {
    results: null;
}
