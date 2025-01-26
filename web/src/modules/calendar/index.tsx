import { Calendar as AntdCalendar, Badge } from "antd";
import { Dayjs } from "dayjs";
import { StorageService } from "../../shared/contexts/storage.context";

export const Calendar: React.FC = () => {
  const { todos } = StorageService();

  const getListData = (value: Dayjs) => {
    const date = value.format("YYYY-MM-DD");
    return todos.filter((todo) => todo.dateStart.startsWith(date));
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="list-none m-0 p-0">
        {listData.map((item) => (
          <li key={item.id} className="my-1">
            <Badge color="blue" text={item.todo} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <AntdCalendar
      cellRender={dateCellRender}
      className="bg-white shadow-lg rounded-xl"
    />
  );
};
