import React from "react";
import {
  AppBar,
  Backdrop,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Link,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import style from "./style";
import { DropzoneDialog } from "material-ui-dropzone";
import AssistantAPI from "../../utils/apis/assistantAPI";
import Helper from "utils/Helper";
import ToastAlert from "../../components/ToastAlert/index";

const useStyles = makeStyles(style);

function Home() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<any>({});

  const handleFileSubmit = async (files: Array<File>) => {
    setLoading(true);
    setOpen(false);
    try {
      if (files.length > 0) {
        const result = await AssistantAPI.testSkill(files[0]);
        const fileData = Helper.extractAxiosFileData(result);
        Helper.downloadFile(result.data, fileData.type, fileData.name);
      }
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.holder}>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Assistant Tester
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container className={classes.content} justify="center">
        {error && error.details && (
          <Grid item>
            <ToastAlert severity="error" text={error.details} />
          </Grid>
        )}
        <Grid item xs={10}>
          <Card elevation={5}>
            <CardContent>
              <Typography variant="body1" component="h2">
                This application aims to test a Watson Assistant Skill. It
                offers an excel template file that needs to be filled with the
                user's input and expected output on every interaction. This way,
                this application can test every input and compare the current
                Skill output to the expected one.
              </Typography>
              <Typography variant="body1" component="h2">
                Check the <Link target="_blank" href="https://trello.com/invite/b/uxWnO0QU/29cf1fabdf5be0582f39c3021127faf4/assistant-manager">
                  Trello link
                </Link> for features requests :)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={10} container>
          <Grid item xs={6} container justify="center" alignItems="flex-start">
            <Button variant="outlined" color="primary">
              <Link href="/tester-template.xlsx" download>
                Download Template
              </Link>
            </Button>
          </Grid>
          <Grid item xs={6} container justify="center" alignItems="flex-start">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setOpen(true)}
            >
              Upload File
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <DropzoneDialog
        open={open}
        onSave={handleFileSubmit}
        onClose={() => setOpen(false)}
        filesLimit={1}
        acceptedFiles={[
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ]}
        useChipsForPreview
        showPreviews={false}
        showPreviewsInDropzone={true}
        dropzoneText={"Upload the xlsx file to test your assistant's skill"}
      />
    </div>
  );
}

export default Home;
