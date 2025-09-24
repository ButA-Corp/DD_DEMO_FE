import { Input } from "antd";

const ReadOnlyField = ({ value }) => (
  <Input
    value={value}
    readOnly
    style={{
      background: "#fafafa",
      color: "#333",
      cursor: "default",
      border: "1px solid #cccccc",
    }}
  />
);

export default ReadOnlyField;
