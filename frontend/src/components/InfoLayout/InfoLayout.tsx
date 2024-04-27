'use client'
import styled from 'styled-components'
import './info.css'
import { color } from '@/config/theme'

export const InfoLayout = ({children}) => {
    return <div className="info-layout">
        {children}
    </div>
}

