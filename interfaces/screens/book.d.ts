interface IBookScreenProps extends IBaseScreenProps {}

interface IBookScreen<P = {}> extends IBaseScreen<P> {}

interface IBookComponentState {
    tieude: string;
    mota: string;
    doanhnghiep: string;
    diachi: string;
    ngay: string;
    gio: string;
}
