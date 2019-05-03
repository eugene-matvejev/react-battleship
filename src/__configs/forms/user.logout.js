const onSubmit = (props, state, onSuccess, onError) => {
    const { onAuthenticate, history } = props;

    onAuthenticate(undefined);
    history.push('/');
};

export default {
    title: 'logout?',
    className: 'form--logout',
    isValid: true,
    config: [],
    onSubmit,
    submitCTRL: {
        label: 'log out',
        className: 'button--logout',
    },
}
