import { Button, Input, InputWrapper, Modal } from "@mantine/core"
import { useEditor } from "@tiptap/react";
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text';
import Underline from '@tiptap/extension-underline';
import Superscript from '@tiptap/extension-superscript';
import { Subscript } from '@tiptap/extension-subscript';
import {Link} from '@mantine/tiptap';
import { TextEditor } from "../TextEditor";
import { useForm } from "@mantine/form";

export const NewsModal = ({isOpen, onClose, content}) => {
    const form = useForm()
    const editor = useEditor({
        extensions: [
          StarterKit,
          Underline,
          Link,
          Superscript,
          Subscript,
          Highlight,
          TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content,
      });

    const createNews = (data) => {
        const content = editor?.getHTML()
        const resultBody = {
            ...data,
            content
        }
        
        onClose()
    }
    return (<Modal opened={isOpen} onClose={onClose} title="Создания новости" size={1280}>
        <form onSubmit={form.onSubmit(createNews)}>
            <InputWrapper label="Наименование статьи" mb={16}>
                <Input  required {...form.getInputProps('title')}/>
            </InputWrapper>

            <InputWrapper label="Ссылка на превью" mb={16}>
                <Input  required {...form.getInputProps('imageUrl')}/>
            </InputWrapper>

            <InputWrapper label="Контент">
                <TextEditor  editor={editor}/>
            </InputWrapper>
            <Button type="submit">Создать</Button>
        </form>
    </Modal>)
}