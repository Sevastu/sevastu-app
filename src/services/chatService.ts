import apiClient from './apiClient';

export interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'worker';
    time: string;
}

const getChatMessages = async (jobId: string): Promise<ChatMessage[]> => {
    const response = await apiClient.get(`/chat/${jobId}`);
    return response.data;
};

const sendMessage = async (jobId: string, text: string): Promise<ChatMessage> => {
    const response = await apiClient.post('/chat/send', { jobId, text });
    return response.data;
};

export const chatService = {
    getChatMessages,
    sendMessage,
};
