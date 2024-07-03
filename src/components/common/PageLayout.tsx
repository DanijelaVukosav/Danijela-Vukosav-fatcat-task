import { ComponentProps, FC, Fragment } from 'react';

import {
    ComponentConfig,
    componentMap,
    PageLayoutProps,
} from '@homework-task/components/common/typesPageLayout';
import { Layout } from '@homework-task/components/Layout';

const renderComponent = (componentConfig: ComponentConfig) => {
    const Component = componentMap[componentConfig.type];
    const componentProps = componentConfig.props as ComponentProps<
        typeof Component
    >;
    return <Component {...componentProps} />;
};
export const PageLayout: FC<PageLayoutProps> = ({ sections }) => {
    return (
        <div>
            {sections.map((section, index) => {
                return (
                    <Layout
                        key={`${index}_${section.props}`}
                        background={section.props}
                    >
                        {/*<div*/}
                        {/*    key={`${index}_${section.props}`}*/}
                        {/*    className={clsx(section.props)}*/}
                        {/*>*/}
                        <Fragment>
                            {section.components.map(
                                (componentConfig, componentIndex) => (
                                    <Fragment
                                        key={`${componentIndex}_${index}_${componentConfig.type}`}
                                    >
                                        {renderComponent(componentConfig)}
                                    </Fragment>
                                )
                            )}
                        </Fragment>
                        {/*</div>*/}
                    </Layout>
                );
            })}
        </div>
    );
};
