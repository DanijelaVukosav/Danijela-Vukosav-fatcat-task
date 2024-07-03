# Homework task

This is simple, scalable and reusable project. You can use it as starter project (template).

##  Project commands

* Start project : ```npm run dev```
* Build project : ```npm run build```
* Check typescript rules: ```npm run typecheck```
* Check eslint rules: ```npm run lint```

## Main features

* ### Generic list component
Generic Component **List\<T\>** is in the folder **src/components/common**. To use this component, you need to pass parameters that are of type **ListProps\<T\>**.
```tsx
interface ListProps<T> {
    items: T[] | null | undefined;
    properties: Array<keyof T>;
}
```

When instantiating a component, it is necessary to specify the type of objects (&lt;T&gt;), the list of objects and the list of attributes that will be displayed in list.
This is example of usage: 
```tsx
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
  dateOfBirth?: Date;
}

const PREDEFINED_USER_PROPERTIES: Array<keyof User> = [
  'id',
  'name',
  'username',
  'email',
  'phone',
];

<List<User> properties={PREDEFINED_USER_PROPERTIES} items={users} />
```

The **List\<T\>** component can be extended to display different types of fields: boolean, date, nested object and others.



* ### Generic form component
Generic Component **CustomForm\<T\>** is in the folder **src/components/common**. To use this component, you need to pass parameters that are of type **FormGeneratorProps<T extends FieldValues, K extends ZodRawShape>**.
```tsx
interface SuccessData {
    message: string;
    resetFormOnSuccess?: boolean;
}

interface SubmitButtonData {
    label?: string;
    loadingLabel?: string;
    className?: string;
}

interface FormGeneratorProps<T extends FieldValues, K extends ZodRawShape> {
    useMutation: () => UseMutationResult<unknown, unknown, T>;
    validationSchema: ZodObject<K, 'strip', ZodTypeAny, T, T>;
    successData: SuccessData;
    submitButtonData?: SubmitButtonData;
    renderForm: (props: {
        register: ReturnType<typeof useForm<T>>['register'];
        errors: FieldErrors<T>;
    }) => ReactNode;
}
```

When instantiating a component, it is necessary to define the type of objects (&lt;T, K&gt;).
Required props are: 
* useMutation - function object (return value of useMutation hook from react-query lib)
* validationSchema - ZodObject which contains form validation rules (zod lib)
* successData - message for user, and optional parameter for reset form on success action
* submitButtonData - customize button data with optional parameters
  * label - button label or default 'Submit'
  * loadingLabel - button loading label for time period while data processing
  * className - change submit button style
* renderForm - functional parameter which render form fields, register them in form data and provide validation errors if exist



This is example of usage:
```tsx
export interface CustomFormData {
  title: string;
  body: string;
}

export interface CustomFormDataZodObject extends ZodRawShape {
  title: z.ZodString;
  body: z.ZodString;
}

const validationSchema: z.ZodObject<
        CustomFormDataZodObject,
        'strip',
        z.ZodTypeAny,
        CustomFormData,
        CustomFormData
> = z.object({
  title: z
          .string()
          .min(1, { message: 'Title is required' })
          .max(50, { message: 'Title must be less than 50 characters' }),
  body: z
          .string()
          .min(1, { message: 'Body is required' })
          .max(200, { message: 'Body must be less than 300 characters' }),
});

<CustomForm<CustomFormData, CustomFormDataZodObject>
        useMutation={() => mutation}
        validationSchema={validationSchema}
        successData={{ message: 'Great, success post data!' }}
        submitButtonData={{
          className:
                  'w-full rounded-lg text-[#475447] p-[15px] bg-[#ffee8d]',
        }}
        renderForm={({ register, errors }) => (
                <>
                  <TextField
                          margin="normal"
                          fullWidth
                          id="title"
                          label="Title"
                          error={!!errors.title}
                          helperText={errors.title?.message}
                          autoFocus
                          {...register('title')}
                  />
                  <TextField
                          margin="normal"
                          fullWidth
                          id="body"
                          label="Body"
                          error={!!errors.body}
                          helperText={errors.body?.message}
                          {...register('body')}
                  />
                </>
        )}
/>
```
Using the useMutation hook from the react-query library, it's easy to track data loading, errors, and the like.


* ### Generic layout component
Generic Component **PageLayout** is in the folder **src/components/common**. To use this component, you need to pass parameters that are of type **PageLayoutProps**.
```tsx
export interface ComponentConfig {
  type: ComponentsEnum;
  props: unknown;
}

export interface SectionConfig {
  type: string;
  props: string;
  components: ComponentConfig[];
}

export interface PageLayoutProps {
  sections: SectionConfig[];
}
```
To use this component, you need to pass the config object that follows **PageLayoutProps** interface:
* sections - array of page sections
  * type - section type which can be used as section name, style class or something similar (for now type has meaning section name )
  * props - section style, array classes as string
  * components - components array which will be displayed
    * type - enum which contains all current components which can be referenced in page layout
    * props - component props

In order to use your component inside a **PageLayout** component, the component must be added to ***ComponentsEnum*** and in ***componentMap***. Also, it is necessary to add its props type to **ComponentPropsType**.
The specified settings are in the file **src/components/common/typesPageLayout.tsx**


```tsx
type ComponentPropsType = CardsProps & PanelShowcaseProps;

export enum ComponentsEnum {
    CARDS = 'CARDS',
    PANEL_SHOWCASE = 'PANEL_SHOWCASE',
    FORM_EXAMPLE = 'FORM_EXAMPLE',
    USERS_LIST = 'USERS_LIST',
}

export const componentMap: Record<ComponentsEnum, FC<ComponentPropsType>> = {
    [ComponentsEnum.CARDS]: Cards,
    [ComponentsEnum.PANEL_SHOWCASE]: PanelShowcase,
    [ComponentsEnum.FORM_EXAMPLE]: FormExample,
    [ComponentsEnum.USERS_LIST]: UserList,
};
```
Example of usage:
```tsx

const data: PageLayoutProps = {
  sections: [
    {
      type: 'layoutSection',
      props: 'bg-emerald-400', //flex justify-center items-center
      components: [
        {
          type: ComponentsEnum.FORM_EXAMPLE,
          props: {},
        },
        {
          type: ComponentsEnum.CARDS,
          props: {
            cards: [
              {
                title: 'Fat cat 1',
                image: './media/cats/cat_1.png',
                description: 'Fat cat description',
                background: '#f0f0f0',
                onClick: undefined,
                buttonText: 'Read more',
              },
              {
                title: 'Fat cat 2',
                image: './media/cats/cat_2.png',
                description: 'Fat cat description',
                background: '#e0e0e0',
                onClick: undefined,
                buttonText: 'Learn more',
              },
            ],
          },
        },
      ],
    },
    {
      type: 'layoutSection',
      props: 'bg-gray-400',
      components: [
        {
          type: ComponentsEnum.PANEL_SHOWCASE,
          props: {
            items: [
              {
                title: 'Panel 1',
                description:
                        'This is the description for panel 1.',
                image: './media/panel/shape1.svg',
              },
              {
                title: 'Panel 2',
                description:
                        'This is the description for panel 2.',
                image: './media/panel/shape2.svg',
              },
              {
                title: 'Panel 3',
                description:
                        'This is the description for panel 3.',
                image: './media/panel/shape3.svg',
              },
            ],
          },
        },
        {
          type: ComponentsEnum.USERS_LIST,
          props: {},
        },
      ],
    },
  ],
};

export const LayoutExample: FC = () => {
  return <PageLayout sections={data.sections} />;
};
```
With **PageLayout** component, you can easy configuration page layout and stack other components in the desired arrangement.



