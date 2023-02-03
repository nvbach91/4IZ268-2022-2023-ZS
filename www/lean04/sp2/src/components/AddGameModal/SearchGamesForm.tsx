import { Button, Form, FormProps, Input } from 'antd';

interface SearchGamesFormProps {
    form: FormProps['form'];
    isFetching: boolean;
    handleSearch: (value: string) => void;
}

export const SearchGamesForm = ({ form, isFetching, handleSearch }: SearchGamesFormProps) => (
    <Form
        form={form}
        layout="inline"
        onFinish={({ search }) => {
            handleSearch(search);
        }}
    >
        <Form.Item name="search" rules={[{ required: true, message: 'Please input search values.' }]}>
            <Input placeholder="Search games" disabled={isFetching} allowClear />
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit" disabled={isFetching}>
                Search
            </Button>
        </Form.Item>
    </Form>
);
