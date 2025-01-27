import { useState } from "react";
import { format } from "date-fns";
import { List, Checkbox, Button, Tooltip } from "antd";
import { CSS } from "@dnd-kit/utilities";
import { Epriority } from "../../../shared/interfaces/priority.enum";
import { BookOpen, FilePenLine, Trash2 } from "lucide-react";
import { StorageService } from "../../../shared/contexts/storage.context";
import { useSortable } from "@dnd-kit/sortable";
import { ITodo } from "../../interfaces/todo.interface";
import { CustomModal } from "../customModal";
import { useToast } from "../../contexts/toast.context";

interface SortableItemProps {
  item: ITodo;
  toggleTodoStatus: (id: string) => void;
  onEdit: (todo: ITodo) => void;
}

export const TodoList = ({
  item,
  toggleTodoStatus,
  onEdit,
}: SortableItemProps) => {
  const { toast } = useToast();
  const { removeTodo } = StorageService();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleCheckboxPointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
  };

  const [isCustomModalOpenToRemoveTodo, setisCustomModalOpenToRemoveTodo] =
    useState(false);
  const [
    isCustomModalOpenToShowAnnotation,
    setisCustomModalOpenShowAnnotation,
  ] = useState(false);

  const openModal = () => setisCustomModalOpenToRemoveTodo(true);
  const closeModal = () => setisCustomModalOpenToRemoveTodo(false);

  const removeItemTodo = (id: string) => {
    removeTodo(id);
    toast.success("Item excluído com sucesso!");
    closeModal();
    return;
  };

  const openModalToAnnotation = (annotation: string) => {
    if (annotation.length < 3) {
      toast.info("Não tem anotações para serem mostradas");
      return;
    }
    setisCustomModalOpenShowAnnotation(true);
  };

  return (
    <>
      <List.Item
        ref={setNodeRef}
        style={style}
        className="bg-[#FFF] shadow rounded p-4 mb-2 h-[70px] flex row items-start"
        {...attributes}
        {...listeners}
      >
        <Tooltip
          placement="right"
          title={
            item.priority === Epriority.LOW
              ? "Prioridade baixa"
              : item.priority === Epriority.MEDIUM
              ? "Prioridade média"
              : item.priority === Epriority.NEUTRAL
              ? "Prioridade neutra"
              : "Prioridade alta"
          }
        >
          <div
            className={`${
              item.priority === Epriority.LOW
                ? "bg-blue-300"
                : item.priority === Epriority.MEDIUM
                ? "bg-orange-300"
                : item.priority === Epriority.NEUTRAL
                ? "bg-gray-300"
                : "bg-red-300"
            } w-[20px] h-[70px] rounded-tr-md rounded-br-md mr-4`}
          ></div>
        </Tooltip>
        <div className="w-full flex justify-between items-center">
          <Checkbox
            checked={item.isFinished}
            onChange={() => toggleTodoStatus(item.id)}
            // @ts-ignore
            onPointerDown={handleCheckboxPointerDown}
          />
          <div className="w-full ml-2">
            <div className="flex row items-center justify-start">
              <h3
                className={`text-lg font-semibold ${
                  item.isFinished
                    ? "line-through text-gray-400"
                    : "text-[#0A0A0A]"
                }`}
              >
                {item.todo}
              </h3>
              <Tooltip title="Clique para ver a informação">
                <BookOpen
                  className="text-[#1d1d1d] w-4 h-4 ml-4 hover:text-orange-400 transition duration-200 ease-in-out"
                  onClick={() => openModalToAnnotation(item.annotation)}
                  onPointerDown={handleCheckboxPointerDown}
                />
              </Tooltip>
            </div>
            <small>
              {item.dateStart
                ? format(new Date(item.dateStart), "dd/MM/yyyy")
                : ""}
            </small>
          </div>
          <Tooltip title="Clique para editar">
            <Button
              type="link"
              onClick={() => onEdit(item)}
              onPointerDown={handleCheckboxPointerDown}
            >
              <FilePenLine className="text-[#04F59D] w-4 h-4" />
            </Button>
          </Tooltip>

          <Tooltip title="Clique para remover">
            <Button
              type="link"
              onClick={openModal}
              onPointerDown={handleCheckboxPointerDown}
            >
              <Trash2 className="text-red-500 w-4 h-4" />
            </Button>
          </Tooltip>
        </div>
      </List.Item>
      <CustomModal
        open={isCustomModalOpenToRemoveTodo}
        close={closeModal}
        onContinue={() => removeItemTodo(item.id)}
        content={`Quer mesmo excluir o item: "${item.todo}"?`}
      />

      <CustomModal
        open={isCustomModalOpenToShowAnnotation}
        close={() => setisCustomModalOpenShowAnnotation(false)}
        onContinue={() => setisCustomModalOpenShowAnnotation(false)}
        content={item.annotation}
      />
    </>
  );
};
