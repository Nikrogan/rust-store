import { Box, Text } from "@mantine/core"
import { useStatData } from "./hooks"
import './StatBox.css'

export const StatBox = ({type, amount}) => {
    const {backgroundColor, currentColor, currentSubtitle, currentTitle} = useStatData({type, amount})
    return <Box className="statbox-container" pt={16} pr={12} pl={28} pb={16} bg={backgroundColor} w={"100%"}>
        <Rub color={currentColor} />
        <Text className="statbox-title">{currentTitle}</Text>
        <Text className="statbox-subtitle">{currentSubtitle}</Text>
    </Box>
}


const Rub = ({color}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
            <circle cx="21" cy="21" r="21" fill={color}>₽</circle>
        </svg>
    )
}