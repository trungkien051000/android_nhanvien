interface IBaseCompProps {
    children?: React.ReactNode;
    navigation?: {
        navigate: (routeName: string, params? :object) => void;
        goBack: () => void;
    };
}

interface IBaseComp<P> extends React.FC<P> {
    defaultProps?: Partial<P>;
}
