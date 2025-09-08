import { Table } from 'antd'

const TableCustom = ({
  pagination,
  columns,
  dataSource,
  loading,
  onPaginationChange,
  ...props
}) => {
  const { page, limit, total } = pagination

  const handlePaginationChange = (page, pageSize) => {
    if (onPaginationChange) {
      onPaginationChange({ page, limit: pageSize })
    }
  }

  return (
    <Table
      rowKey='id'
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      scroll={{ x: 'max-content' }}
      {...props}
      pagination={{
        current: page,
        pageSize: limit,
        total: total,
        showSizeChanger: true,
        pageSizeOptions: ['20', '30', '40'],
        onChange: handlePaginationChange,
      }}
    />
  )
}
export default TableCustom
