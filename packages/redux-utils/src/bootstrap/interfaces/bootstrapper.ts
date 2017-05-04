/**
 * Define a boostrapper. (something configurable and able to boostrap something else)
 * 
 * @export
 * @interface IBootstrapper
 * @template O Type of the input parameter of config
 * @template B Type of the input parameter of bootstrap
 * @template R Type of the output parameter of bootstrap
 */
export interface IBootstrapper<InputConfig, InputBootstrap, OutputBootstrap> {
    /**
     * Configure the bootstrapper.
     */
    config(config: InputConfig): void;

    /**
     * Run the bootstrapper.
     */
    bootstrap(options?: InputBootstrap): OutputBootstrap;
}
