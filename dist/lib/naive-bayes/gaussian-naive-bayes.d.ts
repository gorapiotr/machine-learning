export declare class GaussianNaiveBayes {
    private means;
    private calculateProbabilities;
    constructor(reload?: any, model?: any);
    train(trainingSet: any, trainingLabels: any): void;
    predict(dataset: any): any[];
    toJSON(): {
        modelName: string;
        means: any;
        calculateProbabilities: any;
    };
    static load(model: any): GaussianNaiveBayes;
}
