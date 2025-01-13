import { Box, IconButton } from "@mui/material";
import { HiOutlineTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { HiOutlinePencil } from "react-icons/hi";
import { IoEyeSharp } from "react-icons/io5";

const ActionButton = (props: {
  detailPath: string;
  updatePath?: string;
  onUpdate?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}) => {
  const { detailPath, updatePath, onUpdate, onDelete, onClick } = props;
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate(`${detailPath}`);
    if (onClick) {
      onClick();
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Box>
        <IconButton
          className="hover:bg-black transition-all"
          size="small"
          onClick={handleDetailClick}
        >
          <IoEyeSharp className="text-neutral100 w-5 h-5" />
        </IconButton>
      </Box>
      {updatePath && (
        <Box>
          <IconButton
            className="!bg-amber-100"
            size="small"
            onClick={() => navigate(`${updatePath}`)}
          >
            <HiOutlinePencil className="text-neutral100" />
          </IconButton>
        </Box>
      )}
      {onUpdate && (
        <Box>
          <IconButton className="!bg-amber-100" size="small" onClick={onUpdate}>
            <HiOutlinePencil className="text-neutral100" />
          </IconButton>
        </Box>
      )}
      {onDelete && (
        <Box>
          <IconButton
            className="!bg-[#FFBABA]"
            size="small"
            onClick={handleDelete}
          >
            <HiOutlineTrash className="text-neutral100" />
          </IconButton>
        </Box>
      )}
    </div>
  );
};

export default ActionButton;
