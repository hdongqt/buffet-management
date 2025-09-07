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
        pageSizeOptions: ['5', '10', '20', '50'],
        onChange: (page, pageSize) => {
          if (onPaginationChange) {
            onPaginationChange({ page, limit: pageSize })
          }
        },
      }}
    />
  )
}
export default TableCustom
