import { HighlightOff } from "@mui/icons-material";
import {
  Box,
  DialogActions,
  Dialog as DialogComponent,
  DialogContent,
  DialogTitle,
  IconButton,
  useTheme,
} from "@mui/material";
interface Props {
  fullWidth: boolean;
  maxWidth: "xs" | "sm" | "md" | "lg" | "xl";
  open: boolean;
  onClose: () => void;
  dialogTitle: string;
  content: React.ReactNode;
  action?: React.ReactNode;
}
export const Dialog: React.FC<Props> = (props) => {
  const { content, action, fullWidth, maxWidth, onClose, open, dialogTitle } =
    props;

  const theme = useTheme();

  return (
    <DialogComponent
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={open}
      PaperProps={{
        sx: {
          borderRadius: 6,
          zIndex: theme.zIndex.modal + 1,
        },
      }}
      disablePortal
      onClose={(_, reason) => {
        if (reason !== "backdropClick") onClose();
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: "white",
          color: "black",
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box>{dialogTitle.toUpperCase()}</Box>
          <Box>
            <IconButton onClick={onClose}>
              <HighlightOff sx={{ color: "black" }} />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box pt={3}>{content}</Box>
      </DialogContent>
      <DialogActions>{action}</DialogActions>
    </DialogComponent>
  );
};
