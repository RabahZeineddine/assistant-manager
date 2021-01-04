import { Theme, createStyles } from '@material-ui/core'

export default (theme: Theme) => createStyles({
    holder: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        marginTop: 20
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
})