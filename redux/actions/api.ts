import { SET_LOADER } from '@redux/actions/type';

export const setLoader = (data: boolean = false) => {
    return {
        type: SET_LOADER,
        data,
    };
};
