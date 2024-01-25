'use client'
import {Button as ButtonDefault} from '@mantine/core'


export const Button = ({title = '', ...props}) => {
    return <ButtonDefault {...props}>{title}</ButtonDefault>
}