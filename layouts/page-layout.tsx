"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ButtonProps {
  children?: React.ReactNode;
  // onClick?: () => void;
  // disabled?: boolean;
}

interface PageLayoutProps {
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
  buttons?: ButtonProps[];
  actionMenu?: React.ReactNode;
  children: React.ReactNode;
}

export const PageLayout = ({
  title,
  breadcrumbs,
  buttons,
  actionMenu,
  children,
}: PageLayoutProps) => {
  return (
    <div className="flex h-full flex-col gap-5 rounded-tl-3xl shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b px-6 py-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-4">
            {breadcrumbs && breadcrumbs.length > 0 && (
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((crumb, i) => {
                    const isLast = i === breadcrumbs.length - 1;
                    return (
                      <React.Fragment key={i}>
                        <BreadcrumbItem>
                          {isLast ? (
                            <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink href={crumb.href ?? "#"}>
                              {crumb.label}
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {!isLast && <BreadcrumbSeparator />}
                      </React.Fragment>
                    );
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            )}
            <h1 className="text-xl font-bold tracking-tight">{title}</h1>
          </div>
        </div>

        <div>
          {buttons && buttons.length > 0 && (
            <div className="flex gap-2">
              {buttons.map((button, index) => (
                <div key={index}>{button.children}</div>
              ))}
            </div>
          )}

          {actionMenu && actionMenu}
        </div>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto p-6">{children}</div>
    </div>
  );
};
