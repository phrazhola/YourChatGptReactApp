export const userJson = {
    "id": "b4617193-c6ba-46a8-ae10-e5e30af4c661",
    "user_id": "b4617193-c6ba-46a8-ae10-e5e30af4c661",
    "chats": [
        {
            "chat_id": "8f47a09d-5fc3-4521-9e0d-d0e6270a69bd",
            "title": "test1",
            "create_time": "2023-08-13T00:15:36.308404848Z",
            "update_time": "2023-08-13T00:15:36.308404948Z"
        },
        {
            "chat_id": "eb142c3c-c0c7-413e-8c71-61109977907c",
            "title": "test2",
            "create_time": "2023-08-14T04:24:08.567501172Z",
            "update_time": "2023-08-14T04:24:08.567501272Z"
        }
    ],
    "total": 2,
    "partition": "b4617193-c6ba-46a8-ae10-e5e30af4c661"
};

export const chatHistoryJson = {
    "id": "42dfdac9-fa5a-4439-abe8-ddcd5e19ed46",
    "chat_id": "42dfdac9-fa5a-4439-abe8-ddcd5e19ed46",
    "title": "test3",
    "create_time": "2023-08-18T02:52:56.115602523Z",
    "update_time": "2023-08-18T02:53:01.239205697Z",
    "chat_history": {
        "messages_mapping": {
            "0210b337-9f14-4db5-a2e8-dd2b2068ce05": {
                "message_id": "0210b337-9f14-4db5-a2e8-dd2b2068ce05",
                "role": "user",
                "create_time": "2023-08-18T02:53:00.239205697Z",
                "content": "hi",
                "finish_reason": "",
                "parent_id": "",
                "children": [
                    "99a91246-760d-4fc4-8e6d-ffc73b8d4c62"
                ]
            },
            "99a91246-760d-4fc4-8e6d-ffc73b8d4c62": {
                "message_id": "99a91246-760d-4fc4-8e6d-ffc73b8d4c62",
                "role": "assistant",
                "create_time": "2023-08-18T02:53:01.239205697Z",
                "content": "Hello! How can I assist you today?",
                "finish_reason": "stop",
                "parent_id": "0210b337-9f14-4db5-a2e8-dd2b2068ce05",
                "children": []
            }
        },
        "last_updated_msg": "99a91246-760d-4fc4-8e6d-ffc73b8d4c62"
    },
    "back_ref": {
        "user_id": "b4617193-c6ba-46a8-ae10-e5e30af4c661"
    },
    "partition": "b4617193-c6ba-46a8-ae10-e5e30af4c661"
}

const JsonDisplay = ({ data, className }) => {
    return (
        <pre className={className}>
            {JSON.stringify(data, null, 2)}
        </pre>
    );
};

export default JsonDisplay;
