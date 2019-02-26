export const shuffle = (X: any, y: any, r: any) => {
    for (let i = X.length; i; i--) {
        let j = Math.floor(r.real(0, 1) * i);
        [X[i - 1], X[j]] = [X[j], X[i - 1]];
        [y[i - 1], y[j]] = [y[j], y[i - 1]];
    }
    return [X, y];
};

export const accuracy = (arr1: any, arr2: any) => {
    const len = arr1.length;
    let total = 0;
    for (let i = 0; i < len; ++i) {
        if (arr1[i] === arr2[i]) {
            total++;
        }
    }
    return total / len;
};

export const transform = (classes: any, y: any) => {
    let transform: any = {};
    for (let i = 0; i < classes.length; ++i) {
        transform[classes[i]] = i;
    }


    for (let i = 0; i < y.length; ++i) {
        y[i] = transform[y[i]];
    }

    return y;
};