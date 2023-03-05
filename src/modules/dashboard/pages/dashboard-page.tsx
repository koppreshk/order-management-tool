import { FlexBox } from "../../../common"
import { DashboardContent, DashboardHeader } from "../components"

export const DashboardPage = () => {
    return (
        <FlexBox width="100%" height="100%" flexDirection="column">
            <DashboardHeader />
            <DashboardContent />
        </FlexBox>
    )
}