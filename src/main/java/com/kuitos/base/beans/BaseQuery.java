package com.kuitos.base.beans;

import org.apache.commons.lang.builder.ToStringBuilder;

import java.io.Serializable;

/**
 * Author: kui.liu
 * Date: 14-3-16
 * Time: 下午11:21
 */
@SuppressWarnings("serial")
public class BaseQuery implements Serializable {
    private static final Integer defaultPageSize = 20;
    /**
     * 总条数 *
     */
    private Integer totalItem;
    /**
     * 页数大小 *
     */
    private Integer pageSize;
    /**
     * 当前页 *
     */
    private Integer currentPage;

    /**
     * 开始位置 *
     */
    private int startRow;
    /**
     * 结束位置 *
     */
    private int endRow;

    protected Integer getDefaultPageSize() {
        return defaultPageSize;
    }

    public boolean isFirstPage() {
        return this.getCurrentPage().intValue() == 1;
    }

    public int getPreviousPage() {
        int back = this.getCurrentPage().intValue() - 1;
        if (back <= 0) {
            back = 1;
        }
        return back;
    }

    public boolean isLastPage() {
        return this.getTotalPage() == this.getCurrentPage().intValue();
    }

    public int getNextPage() {
        int back = this.getCurrentPage().intValue() + 1;

        if (back > this.getTotalPage()) {
            back = this.getTotalPage();
        }

        return back;
    }

    /**
     * @return Returns the currentPage.
     */
    public Integer getCurrentPage() {
        if (currentPage == null || currentPage.intValue() == 0) {
            return 1;
        }

        return currentPage;
    }

    /**
     * @param page The currentPage to set.
     */
    public void setCurrentPage(Integer page) {
        if ((page == null) || (page.intValue() <= 0)) {
            this.currentPage = null;
        } else {
            this.currentPage = page;
        }
        setStartEndRow();
    }

    private void setStartEndRow() {
        this.startRow = this.getPageSize().intValue() * (this.getCurrentPage().intValue() - 1);
        this.endRow = this.startRow + this.getPageSize().intValue();
        System.out.println("setStartEndRow: " + startRow + "-" + endRow);
    }

    /**
     * @return Returns the pageSize.
     */
    public Integer getPageSize() {
        if (pageSize == null) {
            return getDefaultPageSize();
        }

        return pageSize;
    }

    /**
     * @param pageSize The pageSize to set.
     */
    public void setPageSize(Integer pageSize) {
        if ((pageSize == null) || (pageSize.intValue() <= 0)) {
            this.pageSize = null;
        } else {
            this.pageSize = pageSize;
        }
        setStartEndRow();
    }

    /**
     * @return Returns the totalItem.
     */
    public Integer getTotalItem() {
        if (totalItem == null) {
            return 0;
        }
        return totalItem;
    }

    /**
     * @param totalItem The totalItem to set.
     */
    public void setTotalItem(Integer totalItem) {
        this.totalItem = totalItem;

        int current = this.getCurrentPage().intValue();
        int lastPage = this.getTotalPage();

        if (current > lastPage) {
            this.setCurrentPage(lastPage);
        }
    }

    public int getTotalPage() {
        int pageSize = this.getPageSize().intValue();
        int total = this.getTotalItem().intValue();
        int result = total / pageSize;

        if ((total == 0) || ((total % pageSize) != 0)) {
            result++;
        }
        return result;
    }

    public int getPageLastItem() {
        int cPage = this.getCurrentPage().intValue();
        int pgSize = this.getPageSize().intValue();
        int assumeLast = pgSize * cPage;
        int totalItem = getTotalItem().intValue();

        if (assumeLast > totalItem) {
            return totalItem;
        } else {
            return assumeLast;
        }
    }

    /**
     * @return Returns the endRow.
     */
    public int getEndRow() {
        return endRow;
    }

    /**
     * @param endRow The endRow to set.
     */
    public void setEndRow(int endRow) {
        this.endRow = endRow;
    }

    /**
     * @return Returns the startRow.
     */
    public int getStartRow() {
        return startRow;
    }

    /**
     * @param startRow The startRow to set.
     */
    public void setStartRow(int startRow) {
        this.startRow = startRow;
    }

    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }
}

